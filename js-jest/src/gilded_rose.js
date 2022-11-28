class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateNormalItem({ quality, sellIn }) {
    if (quality && sellIn) {
      quality -= 1;
      sellIn -= 1;
    }

    return { quality, sellIn };
  }

  updateAgedBrie({ quality, sellIn }) {
    if (quality < 50 && sellIn) {
      quality += 1;
      sellIn -= 1;
    }

    return { quality, sellIn };
  }

  updateBackstagePasses({ quality, sellIn }) {
    if (sellIn) {
      if (sellIn > 5 && sellIn <= 10) {
        quality += 2;
      }

      if (sellIn <= 5) {
        quality += 3;
      }

      if (sellIn > 10) {
        quality += 1;
      }

      sellIn -= 1;
    }

    return { quality, sellIn };
  }

  updateQuality() {
    const result = this.items.map((item) => {
      const { name, quality, sellIn } = item;
      const normalItem =
        [
          "Aged Brie",
          "Sulfuras, Hand of Ragnaros",
          "Backstage passes to a TAFKAL80ETC concert",
        ].includes(name) === false;

      if (normalItem) {
        const { quality, sellIn } = this.updateNormalItem({ ...item });

        item.quality = quality;
        item.sellIn = sellIn;
      }

      if (name === "Aged Brie") {
        const { quality, sellIn } = this.updateAgedBrie({ ...item });

        item.quality = quality;
        item.sellIn = sellIn;
      }

      if (name === "Backstage passes to a TAFKAL80ETC concert") {
        const { quality, sellIn } = this.updateBackstagePasses({
          ...item,
        });

        item.quality = quality;
        item.sellIn = sellIn;
      }
      return item;
    });

    return result;
  }
}

module.exports = {
  Item,
  Shop,
};
