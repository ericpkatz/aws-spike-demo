const mapper = (items)=> {
  return items.reduce((acc, item)=> {
    acc[item.id] = item;
    return acc;
  }, {});

};

export { mapper };
