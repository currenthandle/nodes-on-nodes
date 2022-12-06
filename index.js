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

  const children = node.child_node_ids;
  return children;
}

async function traverseAndTrackIds(childIds) {
  for (let i = 0; i < childIds.length; i++) {
    const childId = childIds[i];
    if (ids[childId]) {
      ids[childId] += 1;
    } else {
      ids[childId] = 1;
      const childsChildren = await fetchNodeChildren(childId);
      await traverseAndTrackIds(childsChildren);
    }
  }
}

async function main() {
  const entryChildren = await fetchNodeChildren(ID);

  await traverseAndTrackIds(entryChildren);

  console.log(ids);
  return ids;
}

main();
