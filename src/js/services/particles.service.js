import { CONFIG_PARTICLES, CONFIG_PARTICLES_CIRKELS } from "../store/particles.store";

export class ParticlesServices {
  particles(map, config) {
    return particlesJS(map, config);
  };

  init() {
    this.particles('canvas', CONFIG_PARTICLES);
    // particles('canvas-circles', CONFIG_PARTICLES_CIRKELS);

    return console.log('🚀 initial Particles');
  }

}
