import { PipelineFunction } from "lunr";

const customPipeline: PipelineFunction = (t: any) => {
	if (!t?.str || typeof t.str !== "string") return [];

	const strs = t.str
		.replace(/[-.,;:?!]/g, " ")
		.split(" ")
		.filter((s: any) => s.length > 0);

	t.str = strs[0];
	return t;
};

export default customPipeline;
