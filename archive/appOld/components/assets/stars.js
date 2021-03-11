const images = {
    zero: { 
      uri: require('./regular_0.png')
    },
    one: { 
      uri: require('./regular_1.png')
    },
    onehalf: { 
        uri: require('./regular_1_half.png')
    },
    two: { 
        uri: require('./regular_2.png')
    },
    twohalf: { 
        uri: require('./regular_2_half.png')
    },
    three: { 
        uri: require('./regular_3.png')
    },
    threehalf: { 
        uri: require('./regular_3_half.png')
    },
    four: { 
        uri: require('./regular_4.png')
    },
    fourhalf: { 
        uri: require('./regular_4_half.png')
    },
    five: { 
        uri: require('./regular_5.png')
    },
    yelp: { 
        uri: require('./yelpfavicon.png')
    }
  }


function renderReview(stars) {
    switch(stars) {
      case 0:
        return images.zero.uri;
      case 1:
        return images.one.uri;
      case 1.5:
        return images.onehalf.uri;
      case 2:
        return images.two.uri;
      case 2.5:
        return images.twohalf.uri;
      case 3:
        return images.three.uri;
      case 3.5:
        return images.threehalf.uri;
      case 4:
        return images.four.uri;
      case 4.5:
        return images.fourhalf.uri;
      case 5:
        return images.five.uri;
      default:
        return images.zero.uri;
    }
  }
  
  export { images, renderReview };