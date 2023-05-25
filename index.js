import { appendFile } from "fs";
import api from "./lib/lightspeed.js";
import slugify from "slugify";
import xml from "xml";

class Item {
  constructor(
    id = 0,
    title = "",
    description = "",
    link = "",
    image_link = "",
    price = 0,
    availability = "",
    condition = "",
    brand = "",
    gtin = "",
    mpn = ""
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.link = link;
    this.image_link = image_link;
    this.price = price;
    this.availability = availability;
    this.condition = condition;
    this.brand = brand;
    this.gtin = gtin;
    this.mpn = mpn;
  }

  toXMLObject() {
    return {
      item: [
        { "g:id": this.id },
        { "g:title": this.title },
        { "g:description": this.description },
        { "g:link": this.link },
        { "g:image_link": this.image_link },
        { "g:condition": this.condition },
        { "g:availability": this.availability },
        { "g:price": this.price + " GBP" },
        {
          "g:shipping": [
            { "g:country": "GB" },
            { "g:service": "Parcel Force" },
            { "g:price": "5.95 GBP" },
            { "g:min_handling_time": "1" },
            { "g:max_handling_time": "3" },
            { "g:min_transit_time": "1" },
            { "g:max_transit_time": "2" },
          ],
        },
        { "g:gtin": this.gtin },
        { "g:brand": this.brand },
        { "g:mpn": this.mpn },
      ],
    };
  }

  static async saveAsXML(items) {
    const xmlObj = {
      rss: [
        {
          _attr: {
            "xmlns:g": "http://base.google.com/ns/1.0",
            version: "2.0",
          },
        },
        {
          channel: [
            { title: "Shooting Supplies Ltd" },
            { link: "https://www.shootingsuppliesltd.co.uk" },
            {
              description: "This is the product feed for Shooting Supplies Ltd",
            },
            ...items.map((item) => item.toXMLObject()),
          ],
        },
      ],
    };

    const xmlString = xml(xmlObj, { declaration: true, indent: "  " });

    try {
      await appendFile("./products.xml", xmlString, (err) => {
        if (err) {
          console.error("Error appending to products.xml:", err);
        } else {
          console.log("Items appended to products.xml");
        }
      });
    } catch (err) {
      console.error("Error: ", err);
    }
  }
}

const startApp = async () => {
  const items = await api.getItems(
    `["Category", "Manufacturer", "Images", "ItemShops", "ItemECommerce", "ItemPrices", "ItemAttributes", "ItemAttributes.ItemAttributeSet", "CustomFieldValues"]`
  );

  const formattedItems = items.map((item) => {
    let imgUrl = "";
    let newItem;

    if (!item.Images?.Image) {
      imgUrl = "";
    } else if (Array.isArray(item.Images.Image)) {
      imgUrl = item.Images.Image[0].FullPath
        ? item.Images.Image[0].FullPath
        : `${item.Images.Image[0].baseImageURL}/w_250/${item.Images.Image[0].publicID}.webp`;
    } else {
      imgUrl = `${item.Images.Image.baseImageURL}/w_250/${item.Images.Image.publicID}.webp`;
    }

    let description = `"${item.ItemECommerce?.shortDescription
      .replace(/<[^>]*>?/gm, "")
      .replaceAll('"', "inch")}"`;

    newItem = new Item(
      item.itemID,
      item.description
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      description,
      `https://www.shootingsuppliesltd.co.uk/${slugify(item.description, {
        lower: true,
        replacement: "-",
        strict: true,
      })}/${item.itemID}`,
      imgUrl,
      parseFloat(item.Prices.ItemPrice[0].amount).toFixed(2),
      parseInt(item.ItemShops.ItemShop[0].qoh) >= 1 ? "in stock" : "out of stock",
      "new",
      item.Manufacturer?.name,
      item.upc,
      item.manufacturerSku
    );

    return newItem;
  });

  await Item.saveAsXML(formattedItems);
};

startApp();
