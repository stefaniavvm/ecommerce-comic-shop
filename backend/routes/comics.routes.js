const express = require("express");
const {
  upload,
  uploadToCloudinary,
} = require("../middlewares/file.middleware");

const Comics = require("../models/Comics");
const auth = require("../middlewares/auth.middleware");

//importando ruta
const comicsRouter = express.Router();

const comics = [
  {
    comic: "Spider-man",
    writer: "Brian Bendis",
    year: "2000",
    penciler: "Mark Gagley",
    image:
      "https://www.zonanegativa.com/imagenes/2016/03/Ultimate-Spider-Man-5-cover.jpg",
    issue: 166,
  },
  {
    comic: "BATMAN",
    nameHero: "Bruce Wyne",
    writer: "Tom King",
    year: 2022,
    description:
      "A shocking heist has the mysterious and deadly figure called the Help cutting his way through Gotham City",
    " penciler": "David Marquez",
    image:
      "https://www.ecccomics.com/content/productos/8208/cubierta_batman_victoria_oscura_black_label_WEB.jpg",

    issues: 3,
  },
  {
    comic: "Daredevil",
    nameHero: "Matt Murdock",

    writer: "Chip Zdarsky",
    year: 2019,
    description:
      "Daredevils origins come from an accident he had in his childhood which gave him special abilities.neighborhood of Hells Kitchen.",
    penciler: "Marco Checchetto",
    image:
      "https://www.eslahoradelastortas.com/blog/media/2020/11/SMUST007_0.jpg",

    issues: 36,
  },
  {
    comic: "NUBIA",
    nameHero: "NUBIA",
    writer: "Vita Ayala",
    year: 2022,
    description:
      "After the events of Trial of the Amazons, a new era for these warriors has dawned.",
    " penciler": "Alitha Martinez",
    image:
      "https://www.dccomics.com/sites/default/files/styles/covers192x291/public/comic-covers/2022/04/NUBIACOROSP_Cv1_00111_DIGITAL_6266f5833c4899.89406053.jpg?itok=mIqQictt",

    issues: 1,
  },
  {
    comic: "Iron Man",
    nameHero: "Tony Stark",
    writer: "Christopher Cantwell",
    year: 2020,
    description:
      "BIG IRON! Tony Stark is looking to restart his engine. He decides hes going back to basics, putting away his high-tech.",
    penciler: "C Cafu",
    image:
      "https://starsmydestination.files.wordpress.com/2021/01/iron-man-01-portada-alex-ross-starsmydestination.jpg",

    issues: 17,
  },
  {
    comic: "WONDER WOMAN",
    nameHero: "Diana Prince",
    writer: "Allan Heinberg",
    year: 2008,
    description:
      "In this volume collecting WONDER WOMAN #1-4, plus WONDER WOMAN ANNUAL #1 by acclaimed writer Allan Heinberg",
    " penciler": "Gary Frank",
    image:
      "https://www.ecccomics.com/content/productos/8091/cubierta_wonder_woman_Goodwatch.jpg",

    issues: 1,
  },
  {
    comic: "Moon Knight",
    nameHero: "Marc Spector",
    writer: "Warren Ellis",
    year: 2014,
    description:
      "Marc Spector is Moon Knight!...Or is he? It's hard to tell these days, especially when New York's wildest vigilante protects.",
    penciler: "Declan Shalvey",
    image:
      "https://i.annihil.us/u/prod/marvel/i/mg/2/80/530e4d1b02751/clean.jpg",

    issues: 1,
  },
  {
    comic: "Wolverine",
    nameHero: "Logan",
    writer: "Benjamin Percy",
    year: 2020,
    description:
      "THE BEST IS BACK! Wolverine been through a lot. He’s been a loner. He’s been a killer.",
    penciler: "Viktor Bogdanovic",
    image:
      "https://i.annihil.us/u/prod/marvel/i/mg/a/20/60917f7b97bfc/clean.jpg",
    issues: 1,
  },
  {
    comic: "X-Men",
    nameHero: "X-Men",
    writer: "Al Ewing",
    year: 2022,
    description:
      "WHO CAN SAVE THE RED PLANET? The mutants of Arakko spent millennia scarred by war.",
    penciler: "Stefano Caselli",
    image:
      "https://i.annihil.us/u/prod/marvel/i/mg/9/70/62432e4f27fcd/clean.jpg",

    issues: 1,
  },
];

//get comics from
comicsRouter.get("/", async (req, res, next) => {
  let filtro = {};
  if (req.query.comic) {
    filtro = { ...filtro, comic: req.query.comic };
  }
  console.log("Filtro de /comics", filtro);
  return Comics.find(filtro)
    .then((comicsLeidos) => {
      return res.status(200).json(comicsLeidos);
    })
    .catch((err) => {
      const error = new Error(error);
      error.status = 500;
      return next(error);
    });
});

comicsRouter.get("/:id", (req, res, next) => {
  const id = req.params.id;
  return Comics.findById(id)
    .then((comic) => {
      if (!comic) {
        const error = new Error("Marvel comic not found");
        error.status = 404;
        return next(error);
      }
      return res.status(200).json(comic);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

//POST
comicsRouter.post("/", (req, res, next) => {
  const imageComic = req.file_url ? req.file_url : undefined;
  const newComic = new Comics({
    comic: req.body.comic,
    writer: req.body.writer,
    year: req.body.year,
    penciler: req.body.penciler,
    image: req.body.image,
    issues: req.body.issues,
    imagen: imageComic,
  });
  return newComic
    .save()
    .then(() => {
      return res.status(201).json(newComic);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

//PUT
comicsRouter.put("/:id", (req, res, next) => {
  const id = req.params.id;

  return Comics.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then((comicActualizado) => {
      return res.status(200).json(comicActualizado);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

//DELETE

comicsRouter.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  return Comics.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).json(`Comic con id: ${id} eliminado`);
    })
    .catch((err) => {
      const error = new Error(err);
      error.status = 500;
      return next(error);
    });
});

module.exports = comicsRouter;
