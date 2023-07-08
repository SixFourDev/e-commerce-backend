const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Use findAll to find all tags
    const tagData = await Tag.findAll({
      // Include associated product data for each tag
      include: [{ model: Product }]
    });
    // If successful, 200 response is sent back with tag data as json response
    res.status(200).json(tagData);
  } catch (err) {
    // If error, 500 status code is sent back
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Use findByPk to find single tag based on id
    const tagData = await Tag.findByPk(req.params.id, {
      // Include associated product data for the tag
      include: [{ model: Product }]
    });
    // Check to see if tag exists
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    // If successful, 200 response is sent along with tagData as json response
    res.status(200).json(tagData);
  } catch (err) {
    // If error, 500 response is sent
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Use create method to create new tag based on the data provided
    const tagData = await Tag.create(req.body);
    // If successful, 200 response is sent along with tagData as json response
    res.status(200).json(tagData);
  } catch (err) {
    // If error, 400 response is sent
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Uses findOne to find tag by id
    const tag = await Tag.findOne({ where: { id: req.params.id } });
    // Check to see if tag exists
    if(!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    // If tag is found, update it's tag name
    await tag.update(req.body.tag_name);
    // 200 response after updating tag
    res.status(200).json({ message: 'Tag updated successfully!' });
  } catch (err) {
    // If error, 500 message is displayed
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Uses destroy to delete tag based on id value
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    // Check to see if tag exists
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    // If deletion is successful, 200 status code is displayed
    res.status(200).json(tagData);
  } catch (err) {
    // If error, 500 response is displayed
    res.status(500).json(err);
  }
});

module.exports = router;
