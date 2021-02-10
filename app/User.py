class User:
    def __init__(self, nickname, role, heroesplayed):
        self.nickname = nickname
        self.role = role
        self.heroesPlayed = heroesPlayed

    def __str__(self):
        return str(self.__class__) + ": " + str(self.__dict__)

