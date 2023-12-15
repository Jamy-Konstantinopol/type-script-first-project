import {Searcher} from "./Searcher"
import text from "./text.json"

const searcher = new Searcher();
let result = searcher.search(text, "ekbwf");
console.log(result);