import Fuse, { FuseResult } from "fuse.js";
import CyrillicToTranslit from 'cyrillic-to-translit-js';

interface IndexData
{
	link: string;
	title: string;
	body: string;
}

export class Searcher
{
    private _indexes: IndexData[] = []
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
	}

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
	}

	private _init(datas : any[])
	{
		this._indexes = datas;
	}

    public search(datas : any[], query : string) : FuseResult<unknown>[]
    {
		this._init(datas);
		query = query.toLowerCase();

		let fuse = new Fuse(this._indexes, {keys: ["link", "title", "body"]});
		
		let result = fuse.search(query);

		if(result.length > 0)
		{
			return result;
		}

		let wrongLayoutQuery = "";

		for(let i = 0; i < query.length; i++)
		{
			let letter : string= query[i];
			
			let char = this._keyboardRuToEn[letter];
			if(char != undefined)
			{
				wrongLayoutQuery += char;
				continue;
			}

			char = this._keyboardEnToRu[letter];
			if(char != undefined)
			{
				wrongLayoutQuery += char;
				continue;
			}
			wrongLayoutQuery += query[i];
		}
		result = fuse.search(wrongLayoutQuery);

		if(result.length > 0)
		{
			return result;
		}

		const transiter = CyrillicToTranslit({preset: 'uk'});
		result = fuse.search(transiter.transform(query));

		if(result.length > 0)
		{
			return result;
		}

		result = fuse.search(transiter.reverse(query));
		
		return result;
    }
}