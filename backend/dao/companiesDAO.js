import mongodb from "mongodb";

let companies;

export default class CompaniesDAO {
  static async injectDB(conn) {
    if (companies) {
      return
    }
    try {
      companies = await conn.db(process.env.PRODUCTS_NS).collection("companies")
    }
    catch (e) {
      console.error(
        `Unable to establish a connection handle in companiesDAO: ${e}`,
      )
    }
  }

  static async addCompany(companyName) {
    try {
      const companyDoc = {
        companyName : companyName,
        date_added: new Date()
      }
      return await companies.insertOne(companyDoc)
    } catch (e) {
      console.error(`Unable to post companies: ${e}`)
      return { error: e }
    }
  }

  static async getCompanies() {
    let companiesList = [];
    try {
      companiesList = await companies.find().toArray()
      return companiesList;
    } catch (e) {
      console.error(`Unable to get companiesList, ${e}`)
      return companiesList;
    }
  }

  static async editCompany(id, companyName) {
    try {
      const updateResponse = await companies.updateOne(
        { _id: ObjectId(id)},
        { $set: {
          companyName: companyName,
          modified_on: new Date(),
        }}
      )
      return updateResponse
    } catch (e) {
      console.error(`Unable to update company: ${e}`)
      return { error: e }
    }
  }

  static async deleteCompany(id) {
    try {
      const deleteResponse = await companies.deleteOne({
        _id: ObjectId(id)
      })
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete product: ${e}`)
      return { error: e}
    }
  }

  // static async getCompanyById(id) {}
}