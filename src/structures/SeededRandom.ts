export default class SeededRandom {
	// The initializer used to generate the seed
	public seed: string;
	// The actual seed
	public trueseed: number[];
	// The pRNG function
	public rand: () => number;

	// sfc32 implementation. Can test randomness with PractRand: http://pracrand.sourceforge.net/
	constructor(initializer?: string | number) {
		this.reseed(initializer);
	}

	public reseed(initializer?: string | number) {
		const seedStr = initializer
			? typeof initializer === 'string'
				? initializer
				: initializer.toString()
			: Math.random().toString();

		this.seed = seedStr;
		const seedFn = this.xmur3(seedStr);
		this.trueseed = [seedFn(), seedFn(), seedFn(), seedFn()];
		this.rand = this.sfc32(
			this.trueseed[0],
			this.trueseed[1],
			this.trueseed[2],
			this.trueseed[3]
		);
	}

	// Rolls a 1 in x chance. Same behavior as roll() in osjs.
	public roll(max: number) {
		return this.randInt(1, max) === 1;
	}

	// Rolls a number from min to max inclusive.
	public randInt(min: number, max: number) {
		const range = max - min + 1;
		return Math.trunc(range * this.rand() + min);
	}

	// Rolls a float from min to max exclusive.
	public randFloat(min: number, max: number) {
		const range = max - min;
		return range * this.rand() + min;
	}
	// xmur3 hash function. Generate good seeds from small inputs
	public xmur3(input: string): () => number {
		const str = input;

		let h = 1779033703 ^ str.length;
		for (let i = 0; i < str.length; i++)
			(h = Math.imul(h ^ str.charCodeAt(i), 3432918353)), (h = (h << 13) | (h >>> 19));
		return function () {
			h = Math.imul(h ^ (h >>> 16), 2246822507);
			h = Math.imul(h ^ (h >>> 13), 3266489909);
			return (h ^= h >>> 16) >>> 0;
		};
	}

	// This is the actual pRNG. Again, use the PractRand library to test this
	public sfc32(a: number, b: number, c: number, d: number): () => number {
		return function () {
			a >>>= 0;
			b >>>= 0;
			c >>>= 0;
			d >>>= 0;
			let t = (a + b) | 0;
			a = b ^ (b >>> 9);
			b = (c + (c << 3)) | 0;
			c = (c << 21) | (c >>> 11);
			d = (d + 1) | 0;
			t = (t + d) | 0;
			c = (c + t) | 0;
			return (t >>> 0) / 4294967296;
		};
	}
}
