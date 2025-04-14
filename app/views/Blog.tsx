import type { Route } from "./+types/Blog";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Blog" },
        {   name: "Description", 
            content: "Blog - Welcome to React Router!" 
        },
    ];
}
function Blog () {
    return (
        <div className="blog">
            <h1 className="heading">Blog</h1>
        </div>
    )
};

export default Blog;