// Separate Remotion entry point for the Motadawel model.
// fps={25} bundled independently — does NOT share anything with the Infograph bundle.
import { registerRoot } from 'remotion';
import { MotadawelRoot } from './RootMotadawel';

registerRoot(MotadawelRoot);
