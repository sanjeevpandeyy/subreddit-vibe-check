import PostCard from "./PostCard";

function PostList({ posts }) {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Hot Posts
          </p>

          <h2 className="mt-2 text-xl font-semibold text-white">
            Top {posts.length} discussions
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}

export default PostList;