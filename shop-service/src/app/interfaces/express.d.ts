interface ISeller {
  id: string;
  email: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      seller?: ISeller;
    }
  }
}

export {};
