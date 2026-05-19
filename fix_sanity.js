const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-24',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

async function main() {
  const posts = await client.fetch(`*[_type == "post" && title match "Pourquoi QoreDB est desktop-only"]`);
  console.log(`Found ${posts.length} posts`);
  
  if (posts.length > 0) {
    const originalPost = posts[0];
    console.log(`Original post ID: ${originalPost._id}, Language: ${originalPost.language}`);
    const baseId = originalPost._id.replace("drafts.", "");
    
    const metadata = await client.fetch(`*[_type == "translation.metadata" && references($id)]`, { id: baseId });
    console.log(`Found ${metadata.length} metadata documents`);
    
    for (const m of metadata) {
      console.log(`Deleting metadata ${m._id}`);
      await client.delete(m._id);
    }

    console.log("Cleanup complete. The translate action should now work without crashing.");
  }
}

main().catch(console.error);
