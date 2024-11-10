from config.config import db

class Equipment(db.Model):
    __tablename__ = 'equipments'

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    in_use = db.Column(db.Boolean, default=False)

    def __repr__(self):
        return f"<Equipment {self.type} - {self.model}>"
