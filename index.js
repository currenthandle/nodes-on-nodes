const URL = 'https://nodes-on-nodes-challenge.herokuapp.com/nodes/:id';
const ENTRY_ID = '089ef556-dfff-4ff2-9733-654645be56fe';

// global dictionary of ids and their counts
const ids = {
  [ENTRY_ID]: 1,
};

// fetches the children of a node
async function fetchNodeChildren(id) {
  const response = await fetch(URL.replace(':id', id));
  const jsonResponse = await response.json();
  const node = jsonResponse[0];

  const children = node.child_node_ids;
  return children;
}

// traverses the tree and tracks the ids
async function traverseAndTrackIds(childIds) {
  // loop over each child
  for (let i = 0; i < childIds.length; i++) {
    const childId = childIds[i];
    // if the child has been seen before, increment its count
    if (ids[childId]) {
      ids[childId] += 1;
    }
    // if the child has not been seen before, add it to the dictionary
    // and traverse its children
    else {
      ids[childId] = 1;
      const childsChildren = await fetchNodeChildren(childId);
      await traverseAndTrackIds(childsChildren);
    }
  }
}

async function main() {
  const entryChildren = await fetchNodeChildren(ENTRY_ID);

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
