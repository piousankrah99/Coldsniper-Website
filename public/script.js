fetch('https://football98.p.rapidapi.com/premierleague/news?rapidapi-key=03d49b89damshb8f15934dce31e7p17b839jsnabe8d1c7c643')
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((objectData) => {
    console.log(objectData);

    const cardContainer = document.getElementById('matchData');

    objectData.forEach((values) => {
      const card = document.createElement('div');
      card.classList.add('News_card');
      card.style.width = '16rem';
      card.style.margin = '20px 20px';

      const image = document.createElement('img');
      image.src = values.Image;
      image.alt = 'News Image';
      image.id = 'News_card_img';

      const titleLink = document.createElement('a');
      titleLink.href = values.NewsLink;

      const title = document.createElement('h5');
      title.textContent = values.Title;
      title.classList.add('card-title');
      title.id = 'card_title';

      titleLink.appendChild(title);

      const publisherName = document.createElement('p');
      publisherName.textContent = values.PublisherName;
      publisherName.id = 'publish_name';

      const publisherDate = document.createElement('p');
      publisherDate.textContent = values.PublisherDate;
      publisherDate.id = 'publish_date';

      const link = document.createElement('a');
      link.href = values.NewsLink;
      link.textContent = 'Read More, Sniper';
      link.classList.add('btn', 'btn-primary');
      link.dataset.aos = 'flip-right';

      card.appendChild(image);
      card.appendChild(titleLink);
      card.appendChild(publisherName);
      card.appendChild(publisherDate);
      card.appendChild(link);

      cardContainer.appendChild(card);
    });

    AOS.init(); // Initialize AOS library after adding elements to the DOM
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  


/*fetch('https://football98.p.rapidapi.com/premierleague/news?rapidapi-key=03d49b89damshb8f15934dce31e7p17b839jsnabe8d1c7c643')
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((objectData) => {
    console.log(objectData);
*/
