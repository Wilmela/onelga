"use server";

import { BlogFormDataType, blogSchema } from "@/lib/validations";
import { revalidatePath, revalidateTag } from "next/cache";
import { handleErrors, validateInput } from "../utils";
import { connectToDatabase } from "../database";
import News from "../database/models/news.model";

export async function createBlogPost(data: BlogFormDataType, shorts: string[]) {
  const fmPic = shorts.map((s, i) => ({
    id: `${s}+${i}`,
    link: s,
  }));

  try {
    const parsed = validateInput(blogSchema, data);
    await connectToDatabase();

    const existingPost = await News.findOne({ title: parsed.title });

    if (existingPost) {
      throw new Error("A blog post with this title already exists");
    }

    const newPost = await News.create({
      ...parsed,
      slug: data.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "") // 3. Remove EVERYTHING except letters, numbers, spaces, and hyphens
        .replace(/[\s;:,]+/g, "-") // 4. Turn spaces, ;, :, and , into hyphens
        .replace(/-+/g, "-") // 5. Collapse multiple hyphens (e.g., "---" to "-")
        .replace(/^-+|-+$/g, ""), // 6. Trim hyphens from start/end
    });

    if (newPost) {
      if (shorts.length > 0) {
        await News.updateOne(
          { _id: newPost._id },
          {
            $push: {
              shots: fmPic,
            },
          },
        );
      }

      revalidatePath("/dashboard/creator/news/view");
    }
    return { success: true };
  } catch (error) {
    console.error("News creation error:", error);
    return {
      error:
        handleErrors(error) || "Failed to create blog post. Please try again.",
    };
  }
}

export async function updateBlogPost(
  id: string,
  data: BlogFormDataType,
  shots: string[],
) {
  const fmtShots = shots.map((s, i) => ({
    id: `${s}+${i}`,
    link: s,
  }));

  try {
    await connectToDatabase();

    const post = await News.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          banner: data.banner,
          author: data.author,
          category: data.category,
          readTime: data.readTime,
          shots: fmtShots,
        },
      },
      { returnDocument: "after" },
    );

    if (post) {
      console.log(post);

      revalidateTag("news", "max");
    }

    return { success: true };
  } catch (error) {
    console.error("Blog update error:", error);
    return { error: handleErrors(error) || "Failed to update blog post" };
  }
}

export async function deleteBlogPost(id: string) {
  try {
    await connectToDatabase();

    const news = await News.findOneAndDelete({ _id: id });

    if (news) {
      revalidateTag("news", "max");
    }

    return { success: true };
  } catch (error) {
    console.error("Blog deletion error:", error);
    return { error: handleErrors(error) || "Failed to delete blog post" };
  }
}

export async function publishNews(slug: string, isPublished: boolean) {
  try {
    await connectToDatabase();

    await News.updateOne(
      { slug },
      {
        $set: {
          isPublished,
        },
      },
    );
    revalidateTag("news", "max");
    revalidatePath("/dashboard/news/view");
    return { success: true };
  } catch (error) {
    return { error: handleErrors(error) };
  }
}
export async function getNews() {
  try {
    await connectToDatabase();

    const news = await News.find().sort({ date: -1 });
    if (!news) throw new Error("No new found");

    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    return { error: handleErrors(error) };
  }
}

export async function get10News() {
  try {
    await connectToDatabase();

    const news = await News.find({ isPublished: true })
      .sort({ date: -1 })
      .limit(10);
    if (!news) throw new Error("No new found");

    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    return { error: handleErrors(error) };
  }
}

export async function getNewByTitle(title: string) {
  try {
    await connectToDatabase();

    const t = decodeURIComponent(title);
    //  $regex: new RegExp(`^${t}$`, "i");

    const news = await News.findOne({
      title: t,
      // isPublished: true,
    });
    if (!news) throw new Error("No new found");

    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    return { error: handleErrors(error) };
  }
}
export async function getNewsBySlug(slug: string) {
  console.log("calling...");
  console.log(slug);

  try {
    await connectToDatabase();

    const news = await News.findOne({
      slug,
    });

    console.log("News", news);

    if (!news) throw new Error("No new found");

    return JSON.parse(JSON.stringify(news));
  } catch (error) {
    return { error: handleErrors(error) };
  }
}

// Paginations
export async function getPaginatedNews(page: number = 1, limit: number = 10) {
  try {
    await connectToDatabase();

    // Calculate how many documents to skip
    const skip = (page - 1) * limit;

    // Fetch paginated news
    const news = await News.find({ isPublished: true })
      .sort({ date: -1 }) // Sort by date, newest first
      .skip(skip)
      .limit(limit);

    // Get total count of published news for pagination calculation
    const totalNews = await News.countDocuments({ isPublished: true });

    // Calculate total pages
    const totalPages = Math.ceil(totalNews / limit);

    if (!news) {
      return {
        news: [],
        totalPages: 0,
        currentPage: page,
        totalNews: 0,
      };
    }

    // Return paginated data with metadata
    return {
      news: JSON.parse(JSON.stringify(news)), // Convert Mongoose documents to plain objects
      totalPages,
      currentPage: page,
      totalNews,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  } catch (error) {
    console.error("Error in getPaginatedNews:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch paginated news",
      news: [],
      totalPages: 0,
      currentPage: page,
      totalNews: 0,
    };
  }
}

export async function getNewsByCategory(
  category: string,
  page: number = 1,
  limit: number = 10,
) {
  try {
    await connectToDatabase();

    const skip = (page - 1) * limit;

    // Fetch paginated news for specific category
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {
      isPublished: true,
    };
    if (category !== "General") {
      query.category = category;
    }

    const news = await News.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for this category
    const totalNews = await News.countDocuments(query);

    const totalPages = Math.ceil(totalNews / limit);

    return {
      news: JSON.parse(JSON.stringify(news)),
      totalPages,
      currentPage: page,
      totalNews,
      category,
    };
  } catch (error) {
    console.error("Error in getNewsByCategory:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch news by category",
      news: [],
      totalPages: 0,
      currentPage: page,
      totalNews: 0,
      category,
    };
  }
}
