const { UnAuthenticatedError } =require ('../errors/index.js')

const checkPermissions = (requestUser:any, resourceUserId:any) => {
  if (requestUser.userId === resourceUserId.toString()) return

  throw new UnAuthenticatedError('Not authorized to access this route')
}

module.exports=  checkPermissions
