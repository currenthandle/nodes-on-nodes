const URL = 'https://nodes-on-nodes-challenge.herokuapp.com/nodes/:id';
const ID = '089ef556-dfff-4ff2-9733-654645be56fe';
// const ID = 'c20c063c-99b3-452f-a44f-72e2dac4eec0';
// const ID = '3e82e3c2-4cd1-4cab-91da-899430299c84';

//const ids = new Set();
//ids.add(ID);
const ids = {
  [ID]: 1,
};
let calls = 0;

async function fetchNodeChildren(id) {
  const response = await fetch(URL.replace(':id', id));
  const jsonResponse = await response.json();
  const node = jsonResponse[0];
  // console.log(node);

  const children = node.child_node_ids;
  return children;
}

async function traverseAndTrackIds(childIds) {
  console.log('childIds', childIds);
  console.log('childIds.length', childIds.length);
  calls++;
  // console.log('calls', calls);
  //const childrenIds = await fetchNodeChildren();

  for (let i = 0; i < childIds.length; i++) {
    const childId = childIds[i];
    console.log('2222', childId);
    if (ids[childId]) {
      console.log('in if childId', childId);
      ids[childId] += 1;
    } else {
      console.log('in else childId', childId);
      ids[childId] = 1;
      const childsChildren = await fetchNodeChildren(childId);
      console.log('childsChildren', childsChildren);
      await traverseAndTrackIds(childsChildren);
    }
  }
  // childrenIds.forEach(async (childId) => {
  //   // already exists on ids
  //   if (ids[childId]) {
  //     ids[childId] += 1;
  //   } else {
  //     ids[childId] = 1;
  //     // fetch all children of the child
  //     const childsChildren = await fetchNodeChildren(childId);
  //     childsChildren.forEach(({ child_node_ids }) =>{
  //       console.log('child_node_ids', child_node_ids)
  //       traverseAndTrackIds(child_node_ids)
  //     );
  //   }
  // });
}

// fetch node children

// add node children to ids dctionary
// increment if already exists

async function main() {
  const entryChildren = await fetchNodeChildren(ID);

  await traverseAndTrackIds(entryChildren);

  console.log(ids);

  // console.log('entryChildren', entryChildren);
  // console.log('hello');
}

main();
// console.log(fetchNodeChildren(ID));
