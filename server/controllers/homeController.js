const index = (req, res) => {
  res.render('home/index', {
    title: 'ProjNotes',
  });
};

const greeting = (req, res) => {
  res.status(200).json({
    mesagge: 'Hola campeon del fullstack web',
  });
};

const about = (req, res) => {
  res.render('home/about', { tittle: 'Acerca de projnotes' });
};

export default {
  index,
  greeting,
  about,
};
