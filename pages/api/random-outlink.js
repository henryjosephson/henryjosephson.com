import { getRandomOutlink } from '../../lib/extractOutlinks';

export default function handler(req, res) {
  const randomOutlink = getRandomOutlink();
  res.status(200).json(randomOutlink || null);
}