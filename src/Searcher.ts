import { StringRewriter } from "./StringRewriter";
import { BaseSearcher } from "./BaseSearcher";

export class Searcher {
	public search<T>(query: string, searcherTypeClass: BaseSearcher<T>): T[] {
		query = query.toLowerCase();
		let result = searcherTypeClass.search(query);

		if (result.length > 0) return result;

		let wrongLayoutQuery = StringRewriter.fixKeyboardLayout(query);

		result = searcherTypeClass.search(wrongLayoutQuery);

		if (result.length > 0) return result;

		result = searcherTypeClass.search(
			StringRewriter.changeRussianToEngilshTranslirization(query)
		);

		if (result.length > 0) return result;

		result = result = searcherTypeClass.search(
			StringRewriter.changeEngilshToRussianTranslirization(query)
		);

		return result;
	}
}
