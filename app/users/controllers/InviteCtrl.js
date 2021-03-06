angular
.module("TheGiveawayBoxApp")
.controller("InviteCtrl", 
function(
    $scope, 
    $routeParams, 
    ListingsFactory,
    InviteFactory,
    AuthFactory,
    GroupsFactory,
) {


    /** 
     * INVITE NEW USERS
     */

    $scope.groups = GroupsFactory.userGroups

    if (GroupsFactory.userGroups.length === 0) {
        const user = {
                uid: $routeParams.userId
        }

        GroupsFactory.getUsersGroups(user).then(r=>{
            $scope.groups = r
        })
    }

    $scope.closeModal = (e) => {
        document.querySelector(".invite__modal").style.display = "none"
    }

    $scope.inviteGroups = []
    
    $scope.inviteCode = ""

    $scope.inviteUser = () =>  {
        
        document.querySelector(".invite__modal").style.display = "block"

        if ($scope.inviteGroups.length === 0) {
            return
        }

        const invite = {
            userId: AuthFactory.getUser().uid,
            created: Date.now(),
            redeemed: false
        }

        InviteFactory.getInviteCode(invite).then(outcome  => {
            $scope.$apply(() => $scope.inviteCode = outcome)
            console.log($scope.inviteCode)
            InviteFactory.setGroupInviteCodes($scope.inviteCode, $scope.inviteGroups)
        })

    }

   
})
