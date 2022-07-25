import { mongoose, ArtikelSchema } from "../schema/artikel.js";

const Artikel = mongoose.model("Artikel", ArtikelSchema);
export { Artikel };
