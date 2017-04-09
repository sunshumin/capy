const Sequelize = require('../config/sequelize.conf')
const Response = require('../utils/Response')
const Util = require('util')

const ProjectModel = Sequelize.import('../models/project.model')
const UserModel = Sequelize.import('../models/user.model')
const ProjectUserModel = Sequelize.import('../models/projectUser.model')

// 查询用户拥有的项目
const findProjectListByUser = async(req, res) => {
  try {
    req.checkQuery('userId', '用户ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const userId = req.query.userId
    const projectUserList = await ProjectUserModel.findAll({
      attributes: ['project_id'],
      where: {
        user_id: userId
      }
    })

    var projectIdList = []
    for (var project of projectUserList) {
      projectIdList.push(project.project_id)
    }

    const projectList = await ProjectModel.findAll({
      where: {
        id: {
          $in: projectIdList
        }
      }
    })

    if (!projectList) {
      Response.error(res, 500, '没有项目')
      return
    }
    Response.success(res, projectList)
  } catch (error) {
    Response.error(res, 500, error)
  }

}

// 查询项目协作者
const findUserListByProject = async(req, res) => {
  try {
    req.checkQuery('projectId', '项目ID不能为空').notEmpty()

    // 检查参数
    const result = await req.getValidationResult()
    if (!result.isEmpty()) {
      Response.error(res, 500, Util.inspect(result.array()))
      return
    }

    const projectId = req.query.projectId
    const userProjectList = await ProjectUserModel.findAll({
      where: {
        project_id: projectId
      }
    })

    var userIdList = []
    for (var userProject of userProjectList) {
      userIdList.push(userProject.user_id)
    }

    const userList = await UserModel.findAll({
      attributes: ['username', 'phone', 'realname', 'email'],
      where: {
        id: {
          $in: userIdList
        }
      }
    })

    if (!userList) {
      Response.error(res, 500, '没有用户')
      return
    }
    Response.success(res, userList)
  } catch (error) {
    Response.error(res, 500, error)
  }
}

module.exports = {
  findProjectListByUser,
  findUserListByProject
}