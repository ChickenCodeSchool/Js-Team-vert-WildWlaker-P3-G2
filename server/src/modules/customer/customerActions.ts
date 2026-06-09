import type { RequestHandler } from "express";

// Import access to data
import customerRepository from "./customerRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (_req, res, next) => {
  try {
    // Fetch all customers
    const customers = await customerRepository.readAll();

    // Respond with the customers in JSON format
    res.json(customers);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const edit: RequestHandler = async (req, res, next) => {
  try {
    const id_user = Number(req.params.id);
    const updatedCustomerData = { ...req.body, id_user };

    // Appel au repository pour sauvegarder en BDD
    await customerRepository.update(updatedCustomerData);

    // On renvoie un statut 204 (No Content) ou 200 avec les données
    res.status(200).json({
      message: "Client mis à jour avec succès",
      data: updatedCustomerData,
    });
  } catch (err) {
    next(err);
  }
};

export default { browse, edit };
