class LiveModel{
  oldMarkets : any
  newMarkets : any
  oldDetails : any
  newDetails : any
}

const LiveModelOneTest = {
  markets : {
      mo : {}, //old markets
      mn : {} //new markets
  },
  details : {
    do : {}, //old details
    dn : {}  //new details
  },
  taxonomies : { //static object
    sport : {},
    category : {},
    tournament : {}
  }

}

const LiveModelTwoTest = {
  markets : {
    '445645456' : { //matchid
      om : {'id12':'id23'}, //old markets
      nm : {} //new markets
    }
  },
  details : {
    '445645456' : { //matchid
      od : { //old details
        markets : [1,2] // keys of markets from matchid
      },
      nd : { //new details
        markets : null // will be null
      }
    }
  },
  taxonomies : { //static object
    sport : {},
    categories : {},
    tournament : {}
  }

}

export {LiveModel, LiveModelOneTest, LiveModelTwoTest}
