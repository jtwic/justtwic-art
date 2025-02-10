const CONFIG_PARTICLES = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.15782952832645453,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 0,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 287.7122877122877,
        "size_min": 51.14885114885115,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 284.0931509876182,
      "color": "#ffffff",
      "opacity": 0.26041872173865,
      "width": 0.8
    },
    "move": {
      "enable": true,
      "speed": 6.313181133058181,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 2288.528160733591,
        "rotateY": 1420.4657549380909
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
};

const CONFIG_PARTICLES_CIRKELS = {
  fpsLimit: 60,
  fullScreen: {enable: true},
  particles: {
    number: {
      value: 50
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.2
    },
    size: {
      value: 400,
      random: {
        enable: true,
        minimumValue: 200
      }
    },
    move: {
      enable: true,
      speed: 10,
      direction: "top",
      outModes: {
        default: "out",
        top: "destroy",
        bottom: "none"
      }
    }
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      resize: true
    }
  },
  style: {
    filter: "blur(50px)"
  },
  detectRetina: true,
  themes: [
    {
      name: "light",
      default: {
        value: true,
        mode: "light"
      },
      options: {
        background: {
          // color: "#f7f8ef"
        },
        particles: {
          color: {
            value: ["#ff5656", "#00FFBC", "#9D2323", "#f6c400"]
          }
        }
      }
    },
    {
      name: "dark",
      default: {
        value: true,
        mode: "dark"
      },
      options: {
        background: {
          // color: "#080710"
        },
        particles: {
          color: {
            value: ["#004f74", "#5f5800", "#245100", "#7d0000", "#810c00"]
          }
        }
      }
    }
  ],
  emitters: {
    direction: "top",
    position: {
      x: 50,
      y: 150
    },
    rate: {
      delay: 0.2,
      quantity: 2
    },
    size: {
      width: 100,
      height: 0
    }
  }
};

export { CONFIG_PARTICLES, CONFIG_PARTICLES_CIRKELS };
