import { StringRewriter } from "./StringRewriter";
import { BaseSearcher } from "./BaseSearcher";
import { IndexData } from "./IndexData";

export class Searcher
{
    public search<T>(query : string, searcherTypeClass : BaseSearcher<T>) : T[]
    {
		query = query.toLowerCase();
		let stringFixer = new StringRewriter();
		let result = searcherTypeClass.search(query);

		if(result.length > 0)
		{
			return result;
		}
		
		let wrongLayoutQuery = stringFixer.fixKeyboardLayout(query);

		result = searcherTypeClass.search(wrongLayoutQuery)

		if(result.length > 0)
		{
			return result;
		}

		result = searcherTypeClass.search(stringFixer.changeRussianToEngilshTranslirization(query));

		if(result.length > 0)
		{
			return result;
		}

		result = result = searcherTypeClass.search(stringFixer.changeEngilshToRussianTranslirization(query));
		
		return result;
    }
}
