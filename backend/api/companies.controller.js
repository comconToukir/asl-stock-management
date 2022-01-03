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
}