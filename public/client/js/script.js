// Aplayer
const aplayer = document.querySelector("#aplayer");
if (aplayer) {
  let dataSong = aplayer.getAttribute("data-song");
  let dataSinger = aplayer.getAttribute("data-singer");
  dataSong = JSON.parse(dataSong);
  dataSinger = JSON.parse(dataSinger);
  const ap = new APlayer({
    container: aplayer,
    lrcType: 1,
    audio: [
      {
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar,
        theme: "#ebd0c2",
        type: "auto",
          lrc: dataSong.lyrics
      },
    ],
    // Các tùy chọn player
    fixed: false, // Cố định player
    mini: false, // Chế độ mini
    autoplay: true, // Tự động phát
    theme: "#b7daff", // Màu theme chung
    loop: "all", // Chế độ lặp (all/one/none)
    order: "list", // Thứ tự phát (list/random)
    preload: "auto", // Chế độ tải trước
    volume: 0.2, // Âm lượng mặc định
    mutex: true, // Tắt các player khác khi phát
    listFolded: false, // Ẩn/hiện playlist
    listMaxHeight: 340, // Chiều cao tối đa playlist

    // Tùy chọn giao diện
    storageName: "aplayer-setting", // Tên storage lưu cấu hình
  });

  const avatar = document.querySelector(".inner-avatar img");
  ap.on("play",() => {
     avatar.style.animationPlayState= "running"
  })

  ap.on("pause",() => {
    avatar.style.animationPlayState= "paused"
 })

 setTimeout(() => {
  ap.on("ended",() => {
    const link = `/songs/listen/${dataSong._id}`;
    fetch(link,{
      method: "PATCH"
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
            const listen = document.querySelector(".inner-listen  span");
            listen.innerHTML = `${data.listen} lượt nghe`
        }
        
      })
    })
  
 },3*60*1000)
 

}

// End Aplayer


//Button Like 
const btnLike = document.querySelector(".inner-like");
if(btnLike){
  btnLike.addEventListener("click",() => {
    const songID = btnLike.getAttribute("data-songID");
    const btnActive = btnLike.classList.contains("active");
    const typeLike = btnActive ? "dislike" : "like";
    const link = `/songs/${typeLike}/${songID}`;
    fetch(link,{
      method: "PATCH"
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
          const contentLike = btnLike.querySelector("span");
        contentLike.innerHTML = `${data.newLike} thích` 
        btnLike.classList.toggle("active");
        }
        
      })
  })
}
// End Button Like 



// Button Favorite 
const listbtnFavorite = document.querySelectorAll(".inner-heart");
if(listbtnFavorite.length > 0){
  listbtnFavorite.forEach(btnFavorite => {
    btnFavorite.addEventListener("click",() => {
      const songID = btnFavorite.getAttribute("data-songID");
      const btnActive = btnFavorite.classList.contains("active");
      const typeFavorite = btnActive ? "unfavorite" : "favorite";
      const link = `/songs/favorite/${typeFavorite}/${songID}`;
      fetch(link,{
        method: "PATCH"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == 200){
          btnFavorite.classList.toggle("active");
          }
          
        })
    })
  })
 
}
// End Button Favorite 



// Search Suggest
  const boxSearch = document.querySelector(".search-bar");
  if(boxSearch){
    const inputSearch = boxSearch.querySelector("input[name=keyword]");
    const suggestContainer = document.querySelector(".suggestions-container");
    inputSearch.addEventListener("keyup",() => {
      const keyword = inputSearch.value.trim();
      if( keyword !== ""){
        const link = `/search/suggest?keyword=${keyword}`;
        fetch(link)
          .then(res => res.json())
          .then(data => {
              if(data.songs.length > 0){
                suggestContainer.classList.add("show");
                const htmls = data.songs.map(song => {
                  return `
                    <div class="suggestion-item">
                        <a href="/songs/detail/${song.slug}">
                          <img src="${song.avatar}" alt="Song thumbnail">
                          <div class="suggestion-content">
                            <div class="song-name">${song.title}</div>
                            <div class="artist-name">${song.infoSinger.fullName}</div>
                          </div>
                        </a>
                      </div>
                  `
                })
                suggestContainer.innerHTML = htmls.join("");
              }else{
                suggestContainer.classList.remove("show");
              }
          })
      }else{
        suggestContainer.classList.remove("show");
      }
     

    })
  }

// End Search Suggest

