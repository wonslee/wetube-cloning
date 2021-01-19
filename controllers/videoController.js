import Video from "../models/Video";
import routes from "../routes";
// 10-5. in render function, 1st argument is the template and 2nd is an object of informations in individual template.
// async & await : 어떤 실행이 끝날 때 까지 기다려준다. 여기선 Video.find
export const videoHome = async (req, res) => {
  // try & catch : error 잡아내기. 디폴트로 error을 잡아내지 못하는건 nodeJS의 문제점.
  try {
    /* 15-4. how we find all the data in model ? 
    .find({}) : finds any video in database ../models/Video.*/
    const videos = await Video.find({});
    // throw Error("hohohohohooo");

    /* 11. how can I get data from DB, to the template?
  : import the data from database ! in MVC pattern, we use controllers as a key function. + data*/
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    // if there is an error, it will return videos, as an empty arrray
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const videoSearch = (req, res) => {
  //   console.log(req)  : query: { teeeerm: 'suckmyass' }
  /* `req` is an object !
  url: '/search?teeeerm=understanding',
  method: 'GET',
  search: '?teeeerm=understanding',
  query: 'teeeerm=understanding',
  pathname: '/search',
  path: '/search?teeeerm=understanding',
  query: { teeeerm: 'understanding' },
  res: <ref *3> ServerResponse { ..... }*/
  // ES6 ! same as const searchingBy = req.query.teeeerm
  const {
    //   serchingBy = req.query.teeeerm
    query: { teeeerm: searchingBy },
  } = req;
  console.log(res);
  console.log(req.query);

  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const video = (req, res) =>
  res.render("videos", { pageTitle: "Videos" });

/* 13. more controllers
get upload & post upload 
: logics when user upload a video */
export const videoGetUpload = (req, res) =>
  res.render("video-upload", { pageTitle: "Video Upload" });

export const videoPostUpload = async (req, res) => {
  // 13-1. giving video informations to req.body
  const {
    body: { title, description },
    file: { path },
  } = req;
  /* console.log(body, file) :
  [Object: null prototype] { title: 'wow', description: 'multer !' } {
  fieldname: 'videoFile',
  originalname: 'Creatures Underwater.mp4',
  .
  .
  .
  path: 'videos/cbad4ea323de529716540bb9b0f18703'
  }*/

  /* 15-5. make uploaded video into real data !
  initializing the schema of data, just same as the names of file. */
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  console.log(newVideo);
  // to do : upload and save video
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) =>
  res.render("video-detail", { pageTitle: "Video Detail" });

export const videoEdit = (req, res) =>
  res.render("video-edit", { pageTitle: "Video Edit" });

export const videoDelete = (req, res) =>
  res.render("video-delete", { pageTitle: "Video Delete" });
