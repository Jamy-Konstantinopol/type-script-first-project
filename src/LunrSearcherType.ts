import lunr from "lunr";
import { BaseSearcher } from "./BaseSearcherType";
import customPipeline from "./customPipeline";
import tokenizer from "./tokenizer";

export class LunrSearcher implements BaseSearcher<lunr.Index.Result>
{
	private _indexes: lunr.Index;

	public init(datas: any[]) {
		this._indexes = lunr(function () {
			this.ref("link");
			this.field("link");
			this.field("title");
			this.field("body");

			this.tokenizer(tokenizer);
			this.pipeline.add(customPipeline);
			this.searchPipeline.add(customPipeline);

			this.pipeline.remove(lunr.trimmer);
			this.pipeline.remove(lunr.stopWordFilter);
			this.pipeline.remove(lunr.stemmer);

			this.searchPipeline.remove(lunr.trimmer);
			this.searchPipeline.remove(lunr.stopWordFilter);
			this.searchPipeline.remove(lunr.stemmer);

			this.metadataWhitelist = ["position"];
			Array.from(datas).forEach((data) => {
				this.add(data);
			});
		});
	}

	public search(query: string): lunr.Index.Result[] {
		return this._indexes.search(query);
	}
}
