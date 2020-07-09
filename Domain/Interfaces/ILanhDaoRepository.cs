﻿using Domain.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface ILanhDaoRepository
    {
        IEnumerable<LanhDao> GetAll();
        LanhDao GetById(int Id);
    }
}
