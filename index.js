const URL = 'https://nodes-on-nodes-challenge.herokuapp.com/nodes/:id';
const ID = '089ef556-dfff-4ff2-9733-654645be56fe';

const ids = {
  [ID]: 1,
};

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
  const idEntries = Object.entries(ids);
  const sortedIdEntries = idEntries.sort((a, b) => b[1] - a[1]);

  const [solutionTo1, solutionTo2] = [
    sortedIdEntries.length,
    sortedIdEntries[0][0],
  ];

  console.log('Solution 1:', solutionTo1);
  console.log('Solution 2:', solutionTo2);

  return [solutionTo1, solutionTo2];
}

main();
