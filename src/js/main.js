import {PROJECTS_STORE} from "./cases.store";

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
const MAIL_REGULAR = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

const consoleWin = document.querySelector('.console');
const consoleHead = document.querySelector('.console__head');
const consoleArea = document.querySelector('.console__area');
const consoleCanvas = document.querySelector('.console__canvas');
const consoleElements = document.querySelector('.console__view');
const consoleInput = document.querySelector('.console__cmd input');

const consoleBtnDestroy = document.querySelector('.console__btn');
const consoleBtnSmall = document.querySelector('.console__btn.--y');
const consoleBtnFull = document.querySelector('.console__btn.--g');

const cmdErrs = {
  errorMailValid: "enter mail valid error",
  errorMsgValid: "enter massage valid error (min length 5 symbol)",
  errorValid: "error valid",
  warnCommand: "command is undefined this console",
  sending: "email in progress...",
  sendingComplete: "email is success sending...",
};

let storeCommand = [];
let countClickUp = 0;
let consoleDragTrigger = false;

const checkElementInDom = (elm, func) => {
  if (typeof (elm) != 'undefined' && elm != null) {
    return func();
  }
};

const mouseX = (event) => {
  return event.clientX
};

const mouseY = (event) => {
  return event.clientY
};

const casesHoverEvent = () => {
  let casesPar = document.querySelectorAll('.cases__item');
  let scrollTimeout;

  let pos = 1;

  const clearScroll = (img) => {
    pos = 1;
    img.scrollTo({top: 1, behavior: "smooth"});

    clearTimeout(scrollTimeout);
  }

  casesPar.forEach((elm) => {
    let
      link = elm.querySelector('a'),
      img = elm.querySelector('.cases__img');

    const scrollElement = () => {
      clearTimeout(scrollTimeout);

      if (img.scrollTop <= img.scrollHeight - 1) {
        pos = pos + 1.6;
        img.scrollTo(0, pos);
        scrollTimeout = setTimeout(scrollElement, 0);
      }
    }

    link.addEventListener('mouseover', (event) => {
      clearScroll(img);

      setTimeout(scrollElement, 3500);
    })

    // link.addEventListener('mouseout', () => {
    //   clearScroll(img);
    // })
  })
};

const createLink = (url, name, pic, desc, year, tags) => {
  const par = document.querySelector('.cases__content');

  let item = document.createElement('div');
  item.setAttribute('class', "cases__item");

  let detail = document.createElement('article');
  detail.setAttribute('class', "cases__detail");

  let picture = document.createElement('picture');
  picture.setAttribute('class', "cases__img");

  let img = document.createElement('img');
  img.setAttribute('src', 'images/cases/' + pic);
  img.setAttribute('loading', 'lazy');

  let head = document.createElement('div');
  head.setAttribute('class', "cases__head");

  let description = document.createElement('h2');
  description.setAttribute('class', "cases__desc");
  description.innerHTML = `${desc}<strong>${year}</strong>`;

  let skillss = document.createElement('div');
  skillss.setAttribute('class', "cases__tags");

  let link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.classList.add('cases__link');
  link.innerHTML = name;

  let data = (parent) => {
    tags.forEach((element) => {
      let elm = document.createElement('mark');
      elm.setAttribute('class', "cases__tag");
      elm.innerHTML = element;
      parent.appendChild(elm);
    })
  }

  par.appendChild(item).appendChild(link);
  par.appendChild(item)

  par.appendChild(item).appendChild(detail).appendChild(picture).appendChild(img);
  par.appendChild(item).appendChild(detail).appendChild(head).appendChild(description);
  par.appendChild(item).appendChild(detail).appendChild(head).appendChild(skillss);

  data(skillss);
};

const positionElement = (event, elm) => {
  const cursor = document.getElementById('cursor');
  const cursorSize = 30 / 2;

  const mouse = {
    x: mouseX(event),
    y: mouseY(event)
  }

  elm.style.top = (mouse.y - cursorSize) + 'px'
  elm.style.left = (mouse.x - cursorSize) + 'px'
};

const sendData = (data) => {
  const XHR = new XMLHttpRequest();

  let urlEncodedData = "",
    // urlEncodedDataPairs = [],
    mail;

  // Turn the data object into an array of URL-encoded key/value pairs.
  // for (mail in data) {
  //   urlEncodedDataPairs.push(encodeURIComponent(mail) + ':' + encodeURIComponent(data[mail]));
  //   console.log('urlEncodedDataPairs = ', urlEncodedDataPairs);
  //   console.log('mail = ', mail);
  //
  // }

  // Combine the pairs into a single string and replace all %-encoded spaces to
  // the '+' character; matches the behaviour of browser form submissions.
  // urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  console.log('data = ', data);
  // Define what happens on successful data submission
  XHR.addEventListener('load', function (event) {
    console.log('Yeah! Data sent and response loaded.');
    setConsole('✓ ', '', cmdErrs.sendingComplete);
  });

  // Define what happens in case of error
  XHR.addEventListener('error', function (event) {
    console.log('Oops! Something went wrong.');
  });

  // Set up our request
  XHR.open('POST', '/sent.php');

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Finally, send our data.
  XHR.send(data);
};

const btnToggles = () => {
  const aside = document.querySelector('.layout__asides');

  const skills = document.querySelector('.skills .skills__content');
  const cases = document.querySelector('.cases .cases__content');

  const skillsBtn = document.querySelector('.skills .caption');
  const casesBtn = document.querySelector('.cases .caption');

  const hide = '--show';
  const upPos = '--up';

  function chekAsidesPos() {
    (cases.classList.contains(hide) || skills.classList.contains(hide))
      ? aside.classList.add(upPos)
      : aside.classList.remove(upPos)
  };

  skillsBtn.addEventListener('click', () => {
    cases.classList.remove(hide);
    skills.classList.toggle(hide);

    chekAsidesPos();
  });

  casesBtn.addEventListener('click', () => {
    skills.classList.remove(hide);
    cases.classList.toggle(hide);

    chekAsidesPos();
  });
};

const initChangeCursor = () => {
  let delayCursor = false;
  const cursor = document.getElementById('cursor');

  // cursor.addEventListener('click', ev => ev.stopPropagation());

  window.addEventListener('mousemove', (event) => {
    const _event = event;

    delayCursor = setTimeout(() => {
      checkElementInDom(cursor, positionElement(event, cursor));
    }, 1)
  })

  window.addEventListener('click', (event) => {
    cursor.classList.add('--expand');

    setTimeout(() => {
      cursor.classList.remove('--expand')
    }, 1000);
  })

  return console.log('🚀 initial Change Cursor');
};

const particles = (map, config) => {
  return particlesJS(map, config);
};

const initParticles = () => {
  particles('canvas', CONFIG_PARTICLES);
  // particles('canvas-circles', CONFIG_PARTICLES_CIRKELS);

  return console.log('🚀 initial Particles');
}

const setConsole = (val, status = false, msg) => {
  let prefix = '';
  let newElm = document.createElement('pre');

  if (status === 'err') {
    newElm.classList.add('--err');
  } else if (status === 'war') {
    newElm.classList.add('--war');
  }

  setTimeout(() => {
    newElm.innerHTML = prefix + val + msg;
    consoleElements.appendChild(newElm);
    consoleArea.scrollBy(0, consoleArea.scrollHeight);
  }, 10);
};

const goTo = (link) => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  let centerX, centerY, wg, hg;

  wg = screenWidth / 1.33;
  hg = screenHeight / 1.33;
  centerX = (screenWidth / 2) - (wg / 2);
  centerY = (screenHeight / 2) - (hg / 2);

  let opt = `left=${centerX},top=${centerY}, width=${wg},height=${hg}`

  window.event.preventDefault();
  window.open(link, '_blank', opt)
};

const cmd = {
  clear: () => {
    consoleElements.innerHTML = '';
  },
  last: () => {
    goTo('https://newsurrogacy.com/');
    setConsole('✓ [last]', '', ' - open last project');
  },
  top: () => {
    for (let arr of PROJECTS_STORE) {
      if (arr.rating >= 8) {
        goTo(arr.link);
      }
    }
    setConsole('✓ [top]', '', ' - open top projects');
  },
  all: () => {
    for (let arr of PROJECTS_STORE) {
      goTo(arr.link);
    }
    setConsole('✓ [all]', '', ' - open all project');
  },
  cv: () => {
    goTo('/cv.pdf');
    setConsole('✓ [cv]', '', ' - open curriculum vitae');
  },
  code: () => {
    goTo('https://codepen.io/IllyaDeveloper/pen/poWVZLX');
    setConsole('✓ [code]', '', ' - my code examples are open');
  },
  crf: () => {
    goTo('https://gb.ru/certificates/1289101.en');
    setConsole('✓ [code]', '', ' - my certificates are open');
  },
  // cv:() => {},
  sent: (val) => {
    let ms = val.slice(4);
    let email = [];
    let emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    let match;

    while (match = emailRegex.exec(ms)) {
      email.push(match[0]);
      ms = ms.replace(match[0], "").trim();
    }

    if (validateEmail(email) && ((ms !== '') && (ms.length >= 5))) {
      sendData({email: email[0], message: ms});
      setConsole('&#9737; [' + email + '] [' + ms + '] ', '', cmdErrs.sending);

      setTimeout(() => {
        }, 300
      )
      return
    }
    if (!validateEmail(email)) {
      return setConsole('✖ [' + (email === '') ? '' : email + '] ', 'err', cmdErrs.errorMailValid);
    }

    if ((ms === '') || (ms.length <= 5)) {
      return setConsole('✖ [' + (ms === '') ? '' : ms + '] ', 'err', cmdErrs.errorMsgValid);
    }
  },
  help: () => {
    let html =
      'Welcome my friend 👋 is my simple console, you can perform:\n' +
      '<pre>$ <b>last</b> - see my last completed project</pre>\n' +
      '<pre>$ <b>top</b> - see the most worthy cases</pre>\n' +
      '<pre>$ <b>all</b> - see all my successful cases</pre>\n' +
      '<pre>$ <b>cv</b> - see my cv</pre>\n' +
      '<pre>$ <b>code</b> - see my code examples</pre>\n' +
      '<pre>$ <b>crf</b> - see my certificates</pre>\n' +
      '<pre>$ <b>sent your@email "your message"</b> - send me a message</pre>\n' +
      '<pre>$ <b>clear</b> - clear console</pre>\n' +
      '<pre>$ <b>help</b> - info commands</pre>';

    consoleElements.innerHTML = '';
    consoleElements.innerHTML = html;
  }
};

const setStoreCommand = (val) => {
  if (storeCommand.length > 20) {
    storeCommand.length = 0;
  }

  storeCommand.unshift(val);
  return storeCommand
};

const getStoreCommand = () => {
  if (storeCommand.length === -1) {
    return
  } else if (countClickUp >= storeCommand.length) {
    countClickUp = 0;
  }

  consoleInput.value = '';
  consoleInput.value = storeCommand[countClickUp];
  countClickUp = countClickUp + 1;
};

const validateEmail = (email) => {
  return String(email).toLowerCase().match(MAIL_REGULAR);
};

const closeDragElement = () => {
  document.onmouseup = null;
  document.onmousemove = null;
};

const consoleDrag = (elm) => {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (consoleHead) {
    consoleHead.onmousedown = dragMouseDown;
  } else {
    elm.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;

    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    let spacer = 20;

    if (consoleDragTrigger) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      elm.style.top = (elm.offsetTop - pos2) + "px";
      elm.style.left = (elm.offsetLeft - pos1) + "px";

      if (
        (elm.offsetTop - pos2) >= spacer && (elm.offsetLeft - pos1) >= spacer
        && ((elm.offsetTop + elm.clientHeight)) <= (window.innerWidth - spacer)
        && ((elm.offsetLeft + elm.clientWidth)) <= (window.innerHeight - spacer)
      ) {

      }
    }
  }
};

const consoleFixedPosition = () => {
  let state = () => {
    consoleDragTrigger = false;
    closeDragElement();
  }

  (consoleWin.classList.contains('--full') || consoleWin.classList.contains('--small'))
    ? state()
    : consoleDragTrigger = true
};

const consoleAnimation = () => {
  //Canvas container
  let p5div = document
    .querySelector('#p5sketch');

//Canvas size
  let w, h;

//P5.js sketch
  let p5sketch = (p5) => {

    p5.setup = () => {
      w = p5div.clientWidth;
      h = p5div.clientHeight;
      p5.createCanvas(w, h);
    };

    p5.windowResized = () => {
      w = p5div.clientWidth;
      h = p5div.clientHeight;

      p5.resizeCanvas(w, h);
    }

    let t1 = 0, t2 = 0, t3 = 0, t4 = 0;
    let
      dt1 = p5.random(0.01, 0.001),
      dt2 = p5.random(0.02, 0.002),
      dt3 = p5.random(0.03, 0.003),
      dt4 = p5.random(0.04, 0.004);

    let rnd = p5.random(10, 800),
      wrnd = w / 2,
      hrnd = h;

    p5.draw = () => {
      p5.clear();
      p5.noFill();
      p5.stroke("#101010");

      // if(p5.frameCount%200==0){
      //   rnd = p5.random(10, 80);
      //   wrnd = p5.random(0, w);
      //   hrnd = p5.random(0, h);
      // }

      for (let i = 1; i < 200; i++) {
        p5.triangle(
          wrnd, hrnd,
          p5.abs(p5.sin(t1 + i * rnd)) * w,
          p5.abs(p5.cos(t2 + i * rnd)) * h,
          p5.abs(p5.sin(t3 + i * rnd)) * w,
          p5.abs(p5.cos(t4 + i * rnd)) * h
        );
      }
      // t1 += dt1;
      t2 += dt2;
      t3 += dt3;
      t4 += dt4;
    }
  }

//P5.js sketch instance
  let p5inst = new p5(p5sketch, p5div);
}

const initConsole = () => {
  if (window.innerWidth <= 960) {
    return
  }

  cmd.help();

  setTimeout(() => {
    consoleWin.classList.remove('--hide');
    consoleFixedPosition();
  }, 1300);

  consoleInput.addEventListener('keydown', (event) => {
    let val = consoleInput.value;

    if (event.key === 'Enter') {
      if ((val != null) || (val !== '')) {
        if (val === 'clear') cmd.clear()
        else if (val === 'help') cmd.help()
        else if (val === 'cv') cmd.cv()
        else if (val === 'last') cmd.last()
        else if (val === 'top') cmd.top()
        else if (val === 'all') cmd.all()
        else if (val === 'code') cmd.code()
        else if (val === 'crf') cmd.crf()
        else if (val.slice(0, 4) === 'sent') cmd.sent(val)
        else setConsole('&#9888; [' + val + '] ', 'war', cmdErrs.warnCommand);
      }
      setStoreCommand(val);

      return consoleInput.value = '';
    }

    if (event.key === 'ArrowUp') {
      getStoreCommand()
    }
  })

  consoleBtnDestroy.addEventListener('click', () => {
    setTimeout(() => {
      consoleWin.remove();
    }, 1300);
  });

  consoleBtnFull.addEventListener('click', () => {
    consoleWin.classList.remove('--small');
    consoleWin.classList.toggle('--full');

    consoleFixedPosition();
  });

  consoleBtnSmall.addEventListener('click', () => {
    consoleWin.classList.toggle('--small')

    consoleFixedPosition();
  });

  consoleArea.addEventListener('click', (event) => {
    event.preventDefault();
    consoleInput.focus()
  });

  consoleDrag(consoleWin);

  return console.log('🚀 initial Console');
};

const appendCasesLinks = () => {
  for (let caseItem of PROJECTS_STORE) {
    createLink(caseItem.link, caseItem.name, caseItem.img, caseItem.desc, caseItem.year, caseItem.tags);
  }

  casesHoverEvent();
};

window.addEventListener('DOMContentLoaded', (event) => {
  initParticles();
  btnToggles();
  appendCasesLinks();
  // initChangeCursor();
  initConsole();
});
