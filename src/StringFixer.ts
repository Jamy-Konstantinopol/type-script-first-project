import CyrillicToTranslit from 'cyrillic-to-translit-js';

export class StringFixer
{
    private _keyboardEnToRu  : { [key:string]:string; } = 
	{
		"q": "й",
		"w": "ц",
		"e": "у",
		"r": "к",
		"t": "е",
		"y": "н",
		"u": "г",
		"i": "ш",
		"o": "щ",
		"p": "з",
		"[": "х",
		"]": "ъ",
		"a": "ф",
		"s": "ы",
		"d": "в",
		"f": "а",
		"g": "п",
		"h": "р",
		"j": "о",
		"k": "л",
		"l": "д",
		";": "ж",
		"'": "э",
		"z": "я",
		"x": "ч",
		"c": "с",
		"v": "м",
		"b": "и",
		"n": "т",
		"m": "ь",
		",": "б",
		".": "ю",
		"/": ".",
	};

	private _keyboardRuToEn : { [key:string]:string; } = 
	{
		"й": "q",
		"ц": "w",
		"у": "e",
		"к": "r",
		"е": "t",
		"н": "y",
		"г": "u",
		"ш": "i",
		"щ": "o",
		"з": "p",
		"х": "[",
		"ъ": "]",
		"ф": "a",
		"ы": "s",
		"в": "d",
		"а": "f",
		"п": "g",
		"р": "h",
		"о": "j",
		"л": "k",
		"д": "l",
		"ж": ";",
		"э": "'",
		"я": "z",
		"ч": "x",
		"с": "c",
		"м": "v",
		"и": "b",
		"т": "n",
		"ь": "m",
		"б": ",",
		"ю": ".",
		".": "/",
	};

    /**
    * Меняет раскладку написаного (например: ctktlrf ензуыскшзе - селедка typescript):
    * @param stringToFix - Строка с неправильной раскладкой
    * @returns Новую строку, с полностью перевернутой раскладкой
    */
    public fixKeyboardLayout(stringToFix: string)
    {
		let wrongLayoutQuery: string = "";

		for (let i = 0; i < stringToFix.length; i++) {
			let letter: string = stringToFix[i];
			let char = this._keyboardRuToEn[letter] || this._keyboardEnToRu[letter] || letter;

			wrongLayoutQuery += char;
		}
		return wrongLayoutQuery;
	}

    /**
    * Каждое слово, написанное на кириллице в строке меняет на транслитерацированное латинское:
    * @param stringToFix - Строка с неправильной раскладкой
    * @returns Новую транслитерацированную строку
    */
    public changeRussianToEngilshTranslirization(stringToFix: string) : string
    {
        const transiter = CyrillicToTranslit({preset: 'uk'});

		return transiter.transform(stringToFix);
	}

    /**
    * Каждое слово, написанное латиницей в строке меняет на транслитерацированное кирилловское:
    * @param stringToFix - Строка с неправильной раскладкой
    * @returns Новую транслитерацированную строку
    */
    public changeEngilshToRussianTranslirization(stringToFix: string) : string
    {
        const transiter = CyrillicToTranslit({preset: 'uk'});

		return transiter.reverse(stringToFix);
	}
}