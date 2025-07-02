import postsData from '@/services/mockData/posts.json';

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PostsService {
  constructor() {
    this.posts = [...postsData];
  }

  async getAll() {
    await delay(300);
    // Sort by timestamp, newest first
    return this.posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  async getById(id) {
    await delay(200);
    const post = this.posts.find(p => p.Id === parseInt(id));
    if (!post) {
      throw new Error('Post not found');
    }
    return { ...post };
  }

  async create(postData) {
    await delay(400);
    
    const newPost = {
      Id: Math.max(...this.posts.map(p => p.Id)) + 1,
      content: postData.content,
      imageUrl: postData.imageUrl || null,
      authorId: 'currentUser',
      author: {
        name: 'You',
        avatar: null,
        online: true
      },
      likes: [],
      comments: [],
      timestamp: new Date().toISOString()
    };
    
    this.posts.unshift(newPost);
    return { ...newPost };
  }

  async update(id, postData) {
    await delay(350);
    
    const index = this.posts.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Post not found');
    }
    
    this.posts[index] = {
      ...this.posts[index],
      ...postData,
      Id: parseInt(id)
    };
    
    return { ...this.posts[index] };
  }

  async delete(id) {
    await delay(250);
    
    const index = this.posts.findIndex(p => p.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Post not found');
    }
    
    this.posts.splice(index, 1);
    return true;
  }

  async like(id) {
    await delay(200);
    
    const post = this.posts.find(p => p.Id === parseInt(id));
    if (!post) {
      throw new Error('Post not found');
    }
    
    if (!post.likes) post.likes = [];
    
    const userLikeIndex = post.likes.findIndex(like => like === 'currentUser');
    if (userLikeIndex === -1) {
      post.likes.push('currentUser');
    } else {
      post.likes.splice(userLikeIndex, 1);
    }
    
    return { ...post };
  }

  async addComment(id, content) {
    await delay(300);
    
    const post = this.posts.find(p => p.Id === parseInt(id));
    if (!post) {
      throw new Error('Post not found');
    }
    
    if (!post.comments) post.comments = [];
    
    const newComment = {
      Id: Date.now(),
      content,
      author: {
        name: 'You',
        avatar: null
      },
      timestamp: new Date().toISOString()
    };
    
    post.comments.push(newComment);
    return { ...post };
  }
}

export const postsService = new PostsService();