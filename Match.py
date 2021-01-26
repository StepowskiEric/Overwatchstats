from User import User


def createUsers(self, user):
    returnUser = []
    returnUser.append(User(user.nickname, user.role, user.heroesPlayed))
    return returnUser


class Match:
    def __init__(self, outcome, owMap, user):
        self.owMap = owMap
        self.outcome = outcome
        self.user = [createUsers(self, user)]

    def __str__(self):
        return str(self.__class__) + ": " + str(self.__dict__)


user1 = User('cheeseeater', 'tank', ["Roadhog', 'Hamster"])
user2 = User('cheeseeaterz', 'tankz', ["Roadhogs', 'Reinhardt"])
print(user1)
print(user2)
matchtest = Match('win', 'Volskaya', [user1, user2])
print(matchtest)
