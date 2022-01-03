import CompaniesDAO from "../dao/companiesDAO.js";

export default class CompaniesController {
  static async apiPostCompany(req, res, next) {
    try {
      const companyName = req.body.companyName

      const companyAddResponse = await CompaniesDAO.addCompany(
        companyName,
      )
      res.json({ success: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetCompanies(req, res, next) {
    try {
      let sellers = await CompaniesDAO.getCompanies();
      res.json(sellers)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiEditCompany(req, res, next) {
    try {
      const id = req.body.companyId
      const companyName = req.body.companyName

      const updateResponse = await CompaniesDAO.editCompany(
        id,
        companyName,
      )

      var { error } = updateResponse
      if (error) {
        res.status(400).json({ error })
      }

      if(updateResponse.modifiedCount === 0) {
        throw new Error(
          "Unable to update company"
        )
      }

      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiDeleteCompany(req, res, next) {
    try {
      const id = req.body.companyId
      // console.log(id)
      const deleteResponse = await CompaniesDAO.deleteCompany(
        id,
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
}