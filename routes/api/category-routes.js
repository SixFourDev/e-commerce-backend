const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find All Category data
    const categoryData = await Category.findAll({
      // Include the associated Products
      include: [{ model: Product }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    // Find Category by id
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });
    // Check if category has an id
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    // Display category data
    res.status(200).json(categoryData);
  } catch (err) {
    // If error display 500 status
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Use create to grab the user input from the body element
    const categoryData = await Category.create(req.body);
    // Add the input from user to Category
    res.status(200).json(categoryData);
  } catch (err) {
    // If error display 400 message
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Use findOne to find the existing category by id
    const category = await Category.findOne({ where: { id: req.params.id } });
    // Check to see if it is a real category id
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    // Update the category with the new data
    await category.update(req.body);
    // Send 200 response with success message
    res.status(200).json({ message: 'Category updated successfully!' });
  } catch (err) {
    // If error display 500 response
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    // Use destroy method to delete the category
    const categoryData = await Category.destroy({
      // Find category by id
      where: {
        id: req.params.id
      }
    });
    // Check to see if category id exists
    if(!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    // Successful deletion
    res.status(200).json(categoryData);
  } catch (err) {
    // Catch error and display 500 response
    res.status(500).json(err);
  }
});

module.exports = router;
