import { UrlConverter } from "./src/UrlConverter";

describe("UrlConverter", () => {
	it("Меняются на строчные", () => {
		let urlConverter = new UrlConverter();
		let result = urlConverter.convertToUrl("Privet-MEnya-ZOVut");

		expect(result).toEqual("privet-menya-zovut");
	});

	it("Tранслитерация", () => {
		let urlConverter = new UrlConverter();
		let result = urlConverter.convertToUrl("privet-меня-зовут");

		expect(result).toEqual("privet-menya-zovut");
	});

	it("Вместо пробелов и знаков препинаний ставится дефис, несколько дефисов заменяются на один", () => {
		let urlConverter = new UrlConverter();
		let result = urlConverter.convertToUrl(
			"привет, ?*... ,, меня  ()%:?%?:%?:%зовут12"
		);

		expect(result).toEqual("privet-menya-zovut12");
	});
});
