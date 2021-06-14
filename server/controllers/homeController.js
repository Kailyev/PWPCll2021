const index = (req, res) => {
  res.render('index', {
    title: 'ProjNotes',
  });
};

const greeting = (req, res) => {
  res.status(200).json({
    mesagge: 'Hola campeon del fullstack web',
  });
};

export default {
  index,
  greeting,
};
