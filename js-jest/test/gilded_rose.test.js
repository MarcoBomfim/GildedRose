const {
  Shop,
  Item,
  AgedBrie,
  Sulfuras,
  BackstagePass,
} = require("../src/gilded_rose");

describe("Gilded Rose", function () {
  describe("Items", () => {
    it("should reduce quality by 1 every day", function () {
      const gildedRose = new Shop([new Item("foo", 1, 1)]);
      const item = gildedRose.updateQuality().find((i) => i.name === "foo");

      expect(item.quality).toBe(0);
      expect(item.sellIn).toBe(0);
    });

    it("should always have positive quality", () => {
      const gildedRose = new Shop([new Item("foo", 1, 0)]);
      const item = gildedRose.updateQuality().find((i) => i.name === "foo");

      expect(item.quality).toBeGreaterThanOrEqual(0);
    });

    describe("Aged Brie", () => {
      it("should always have positive quality", () => {
        const gildedRose = new Shop([new AgedBrie(2, 5)]);
        const item = gildedRose
          .updateQuality()
          .find((i) => i.name === "Aged Brie");

        expect(item.quality).toBe(6);
      });

      it("should always have quality <= 50", () => {
        const gildedRose = new Shop([new AgedBrie(2, 50)]);
        const item = gildedRose
          .updateQuality()
          .find((i) => i.name === "Aged Brie");

        expect(item.quality).toBeLessThanOrEqual(50);
      });
    });

    describe("Sulfuras", () => {
      it("should never expire", () => {
        const gildedRose = new Shop([new Sulfuras(2, 50)]);
        const item = gildedRose
          .updateQuality()
          .find((i) => i.name === "Sulfuras, Hand of Ragnaros");

        expect(item.sellIn).toBeLessThanOrEqual(2);
      });

      it("should never lose quality", () => {
        const gildedRose = new Shop([new Sulfuras(2, 50)]);
        const item = gildedRose
          .updateQuality()
          .find((i) => i.name === "Sulfuras, Hand of Ragnaros");

        expect(item.quality).toBeLessThanOrEqual(50);
      });
    });

    describe("Backstage passes", () => {
      it("should increase quality by 1 if sellIn > 10", () => {
        const gildedRose = new Shop([new BackstagePass(11, 1)]);
        const item = gildedRose
          .updateQuality()
          .find((i) => i.name === "Backstage passes to a TAFKAL80ETC concert");

        expect(item.quality).toBe(2);
        expect(item.sellIn).toBe(10);
      });

      it("should increase quality by 2 if sellIn < 10", () => {
        const gildedRose = new Shop([new BackstagePass(9, 1)]);
        const item = gildedRose
          .updateQuality()
          .find((i) => i.name === "Backstage passes to a TAFKAL80ETC concert");

        expect(item.quality).toBe(3);
        expect(item.sellIn).toBe(8);
      });

      it("should increase quality by 3 if sellIn < 5", () => {
        const gildedRose = new Shop([new BackstagePass(4, 1)]);
        const item = gildedRose
          .updateQuality()
          .find((i) => i.name === "Backstage passes to a TAFKAL80ETC concert");

        expect(item.quality).toBe(4);
        expect(item.sellIn).toBe(3);
      });
    });
  });
});
