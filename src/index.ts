import {Searcher} from "./Searcher"
import text from "./text.json"

const searcher = new Searcher();
var result = searcher.search(text, "селедка");
console.log(result);