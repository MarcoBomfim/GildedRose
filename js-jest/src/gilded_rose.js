class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality() {
    if (this.quality && this.sellIn) {
      this.quality -= 1;
      this.sellIn -= 1;
    }
  }
}

class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super("Aged Brie", sellIn, quality);
  }

  updateQuality() {
    if (this.quality < 50 && this.sellIn) {
      this.quality += 1;
      this.sellIn -= 1;
    }
  }
}

class Sulfuras extends Item {
  constructor(sellIn, quality) {
    super("Sulfuras, Hand of Ragnaros", sellIn, quality);
  }

  updateQuality() {}
}

class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }

  updateQuality() {
    if (this.sellIn) {
      if (this.sellIn > 5 && this.sellIn <= 10) {
        this.quality += 2;
      }

      if (this.sellIn <= 5) {
        this.quality += 3;
      }

      if (this.sellIn > 10) {
        this.quality += 1;
      }

      this.sellIn -= 1;
    }
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    const result = this.items.map((item) => {
      item.updateQuality();

      return item;
    });

    return result;
  }
}

module.exports = {
  Item,
  AgedBrie,
  Sulfuras,
  BackstagePass,
  Shop,
};
