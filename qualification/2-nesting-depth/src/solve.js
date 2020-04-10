export const solve = (data) => {
  const { N } = data;
  let result = N.split('')
  if (N.length == 1) {
    const num = parseInt(N)
    for(let i = 0; i < num; i++) {
      result.unshift('(')
    }
    for(let i = 0; i < num; i++) {
      result.push(')')
    }
    return result.join('')
  }
  const collection = clone(result)
  collection.map((item, index) => {
    if (!index) {
      for(let i = 0; i < parseInt(item); i++) {
        result.unshift('(')
      }
      
      if (collection[index] > collection[index + 1]) {
        const length = parseInt(collection[index]) - parseInt(collection[index + 1])
        for(let i = 0; i < length; i++) {
          const gap = result.length - collection.length
          result.splice(gap + index + 1, 0, ')')
        }
      } else if (collection[index] < collection[index + 1]) {
        const length = parseInt(collection[index]) - parseInt(collection[index + 1])
        for(let i = 0; i < length; i++) {
          const gap = result.length - collection.length
          result.splice(gap + index, 0, '(')
        }
      }
    } else if (index == collection.length - 1) {
      for(let i = 0; i < parseInt(item); i++) {
        result.push(')')
      }
    } else {
      if (collection[index] > collection[index + 1]) {
        const length = parseInt(collection[index]) - parseInt(collection[index + 1])
        for(let i = 0; i < length; i++) {
          const gap = result.length - collection.length
          result.splice(gap + index + 1, 0, ')')
        }
      } else if (collection[index] < collection[index + 1]) {
        const length =  parseInt(collection[index + 1]) - parseInt(collection[index])


        for(let i = 0; i < length; i++) {
          const gap = result.length - collection.length
          result.splice(gap + index + 1, 0, '(')
        }
      }
    }
  })

  return result.join('')
}


function clone(item) {
  if (!item) { return item; } // null, undefined values check

  var types = [ Number, String, Boolean ], 
      result;

  // normalizing primitives if someone did new String('aaa'), or new Number('444');
  types.forEach(function(type) {
      if (item instanceof type) {
          result = type( item );
      }
  });

  if (typeof result == "undefined") {
      if (Object.prototype.toString.call( item ) === "[object Array]") {
          result = [];
          item.forEach(function(child, index, array) { 
              result[index] = clone( child );
          });
      } else if (typeof item == "object") {
          // testing that this is DOM
          if (item.nodeType && typeof item.cloneNode == "function") {
              result = item.cloneNode( true );    
          } else if (!item.prototype) { // check that this is a literal
              if (item instanceof Date) {
                  result = new Date(item);
              } else {
                  // it is an object literal
                  result = {};
                  for (var i in item) {
                      result[i] = clone( item[i] );
                  }
              }
          } else {
              // depending what you would like here,
              // just keep the reference, or create new object
              if (false && item.constructor) {
                  // would not advice to do that, reason? Read below
                  result = new item.constructor();
              } else {
                  result = item;
              }
          }
      } else {
          result = item;
      }
  }

  return result;
}